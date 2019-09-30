const chalk = require('chalk');
const sassLint = require('sass-lint');
const table = require('text-table');

/**
 * @override
 */
function pluralize(word, count)
{
    return count === 1 ? word : `${word}s`;
}

/**
 * @override
 */
function checkFile(file, report, options)
{
    const ignore = options.ignoreFiles || [];
    if (!ignore.includes(file.filePath))
    {
        if (file.warningCount && options.quiet)
        {
            file.warningCount = 0;
        }
        if ((file.errorCount || file.warningCount) && !options.testing)
        {
            // We can't easily use webpack's outputing for info,
            // so this get's prettified, and dumped to terminal
            // eslint-disable-next-line
            console.log(formatter(file.messages, file.filePath));
        }
        if (file.errorCount)
        {
            report.push({
                error : true,
                file  : file.filePath
            });
        }
        if (file.warningCount)
        {
            report.push({
                error : false,
                file  : file.filePath
            });
        }
        // Allow dying on sasslint error of set
        if (options.failOnError && file.errorCount)
        {
            throw new Error('Failed because of a sasslint error.\n');
        }
        else if (options.failOnWarning && file.warningCount)
        {
            throw new Error('Failed because of a sasslint warning.\n');
        }
    }
}

/**
 * @override
 */
function formatMessage(message, counters)
{
    let messageType;
    if (message.fatal || message.severity === 2)
    {
        messageType = chalk.red('error');
        counters.errors++;
    }
    else
    {
        messageType = chalk.yellow('warning');
        counters.warnings++;
    }

    return [
        '',
        message.line || 0,
        message.column || 0,
        messageType,
        message.message.replace(/\.$/, ''),
        chalk.gray(message.ruleId || '')
    ];
}

/**
 * @override
 */
function toTable(messages, counters)
{
    return table(messages.map(message => formatMessage(message, counters)), {
        align : ['', 'r', 'l'],
        /**
         * @override
         */
        stringLength(str)
        {
            return chalk[counters.errors ? 'red' : 'yellow'](str).length;
        }
    })
        .split('\n')
        .map(el => el.replace(/(\d+)\s+(\d+)/, (m, p1, p2) => chalk.gray(`${p1}:${p2}`)))
        .join('\n');
}

/**
 * Funcion para formatear los errores del linter
 *
 * @param {String} results mensaje del fichero
 * @param {String} filePath parh del fichero
 * @return {String} resultado del formateo de los errores del linter
 */
function formatter(results, filePath)
{
    let output = '';
    const counters = {
        errors   : 0,
        warnings : 0
    };
    const messages = results;
    const total = messages.length;
    if (total)
    {
        output += `
${chalk.underline(filePath)}
${toTable(messages, counters)}

`;
        if (total > 0)
        {
            const { errors, warnings } = counters;
            output += chalk[errors ? 'red' : 'yellow'].bold(
                `\u2716 ${total} ${pluralize('problem', total)} (${errors} ${pluralize(
                    'error',
                    errors
                )}, ${warnings} ${pluralize('warning', warnings)})\n`
            );
        }
    }

    return output;
}

// /**
//  * @override
//  */
// function ignorePlugins(plugins, currentPlugin)
// {
//     return (plugins || []).reduce(
//         (acc, plugin) => (currentPlugin && currentPlugin.indexOf(plugin) > -1 ? true : acc),
//         false
//     );
// }

/**
 * Linter
 *
 * @param {String} input sasslint file globbing pattern
 * @param {Object} options config scsslint configuration
 * @return {Array} file report containing error/warning files
 */
function lint(input, options)
{
    const fileReport = [];
    const report = sassLint.lintFiles(input, {}, options.configFile);
    if (report.length)
    {
        report.forEach(file => checkFile(file, fileReport, options));
    }

    return fileReport;
}

// /**
//  * @override
//  */
// function apply(options, compiler)
// {
//     // access to compiler and options
//     compiler.plugin('compilation', compilation =>
//     {
//         // Avoid redundant lint when it comes to running with other plugins
//         if (!ignorePlugins(options.ignorePlugins, compilation.name))
//         {
//             // Linter returns a simple report of FilePath + Warning or Errors
//             const report = [];
//             (options.context || [compiler.context]).forEach(context =>
//                 report.push(...lint(`${context}/${options.glob}`, options))
//             );
//             // Hook into the compilation as early as possible, at the seal step
//             compilation.plugin('seal', function ()
//             {
//                 // Errors/Warnings are pushed to the compilation's error handling
//                 // so we can drop out of the processing tree on warn/error
//                 report.forEach(x =>
//                 {
//                     if (x.error)
//                     {
//                         // eslint-disable-next-line
//                         this.errors.push(x.file);
//                     }
//                     else
//                     {
//                         // eslint-disable-next-line
//                         this.warnings.push(x.file);
//                     }
//                 });
//             });
//         }
//     });
// }

/**
 * Plugin para el linter de estilos.
 *
 * @see     https://webpack.js.org/contribute/writing-a-plugin/
 * @type    {module.VueSassLintPlugin}
 */
module.exports = class VueSassLintPlugin
{
    /**
     * @constructor
     * @param   {Object}    options Plugin options
     */
    constructor(options = {})
    {
        // Default Glob is any directory level of scss and/or sass file,
        // under webpack's context and specificity changed via globbing patterns
        options.glob = options.glob || '**/*.s?(c|a)ss';
        ['ignoreFiles', 'ignorePlugins', 'context'].forEach(option =>
        {
            if (options[option] && typeof options[option] === 'string')
            {
                options[option] = [options[option]];
            }
        });
        if (Array.isArray(options))
        {
            options = {
                include : options
            };
        }
        if (!Array.isArray(options.include))
        {
            options.include = [options.include];
        }

        this.config = options;
    }

    /**
     * Interfaz del plugin
     * @param   {Object}    compiler    Objeto Webpack
     */
    apply(compiler)
    {
        compiler.hooks.compile.tap('VueSassLintPlugin', () =>
        {
            const options = this.config;
            const reports = [];
            (options.context || [compiler.context]).forEach(context =>
                reports.push(...lint(`${context}/${options.glob}`, options))
            );

            reports.forEach(
                report =>
                {
                    if (report.error && options.failOnError)
                    {
                        throw new Error(`Error in ${report.file}`);
                    }
                }
            );
        });
    }
};
