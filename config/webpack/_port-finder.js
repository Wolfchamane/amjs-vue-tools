const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const net                  = require('node-env-tools');
const portfinder           = require('portfinder');
//
module.exports = (config, serverPort) => new Promise(
    (resolve, reject) =>
    {
        portfinder.basePort = net.get('PORT', serverPort);
        portfinder.getPort(
            (err, port) =>
            {
                if (err)
                {
                    reject(err);
                }
                else
                {
                    // Publica el puerto para otros módulos.
                    net.set('PORT', port);
                    // Agrega el puerto a la configuración del servidor.
                    config.devServer.port = port;
                    // Agrega el manejador de errores.
                    config.plugins.push(
                        new FriendlyErrorsPlugin(
                            {
                                compilationSuccessInfo : {
                                    messages : [
                                        `Tu aplicación se está ejecutado aquí: http://${config.devServer.host}:${port}`
                                    ]
                                }
                            }
                        )
                    );
                    resolve(config);
                }
            }
        );
    }
);
