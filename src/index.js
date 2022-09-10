/* istanbul ignore file */
import './styles/main.sass';
import '@/../config/vue';
import DemoButton from '@/components/button';
import Vue        from 'vue';

const template = `<div>
    <h1>It works!</h1>
    <demo-button @click="_onClick">Click Me!</demo-button>
    <p>Clicks: {{ counter }}</p>
</div>`;

const _onDOMContentLoaded = () =>
{
    /* eslint no-new : [0] */
    new Vue({
        el         : '#app',
        components : {
            DemoButton
        },
        data       : () => ({ counter : 0 }),
        methods    : {
            /**
             * Handles click event
             * @private
             */
            _onClick()
            {
                this.counter = Number(this.counter + 1);
            }
        },
        template
    });
};

window.addEventListener('DOMContentLoaded', _onDOMContentLoaded);
