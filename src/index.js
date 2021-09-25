/* istanbul ignore file */
import '@/styles/main.sass';
import '@amjs/vue-tools/config/vue';
import DemoButton from '@/components/button';
import Vue        from 'vue';

const _onDOMContentLoaded = () =>
{
    /* eslint no-new : [0] */
    new Vue({
        el         : '#app',
        components : { DemoButton },
        template   : `
            <div>
                <h1>It works!</h1>
                <demo-button>Click Me!</demo-button>
            </div>`
    });
};

window.addEventListener('DOMContentLoaded', _onDOMContentLoaded);
