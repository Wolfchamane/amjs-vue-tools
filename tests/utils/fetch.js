/* istanbul ignore file */
/**
 * Realiza un mock del método global `fetch` para poder realizar
 * aquellas pruebas que lo requieran.
 *
 * @param {Object} text Texto a devolver como respuesta de la petición.
 */
export default function fetch(text)
{
    global.fetch = () => ({
        /**
         * @override
         */
        text()
        {
            return JSON.stringify(text);
        }
    });
    global.Request = class
    {};
}
