import routes from '@deriv/shared/utils/routes';
import { isDesktop } from '@deriv/shared/utils/screen';
import { localize } from '@deriv/translations';

const platform_config = [
    {
        icon: 'IcBrandDbot',
        title: () => localize('Teed Bot'),
        description: () => localize('A whole new trading experience on a powerful yet easy to use platform.'),
        link_to: routes.bot,
    }
];

export default platform_config.filter(config => !!config); // filter undefined
