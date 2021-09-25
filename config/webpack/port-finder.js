const webpack              = require('webpack');
const portfinder           = require('portfinder');
const net                  = require('@jf/node-env-tools');

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
                        new webpack.ProgressPlugin((progress) =>
                        {
                            if (progress === 1)
                            {
                                console.log(`\nApplication is running here: http://${config.devServer.host}:${port}`);
                            }
                        })
                    );
                    resolve(config);
                }
            }
        );
    }
);
