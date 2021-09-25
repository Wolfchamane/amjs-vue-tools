/* istanbul ignore file */
import DemoButton from '@/components/button';
import renderer   from '#/utils/renderer';

describe('DemoButton - Snapshot', () =>
{
    it('Default', async () => expect(await renderer(DemoButton, null, true)).toMatchSnapshot());
    it('With [type="submit"]', async () => expect(await renderer(DemoButton, { type : 'submit' }, true)).toMatchSnapshot());
});
