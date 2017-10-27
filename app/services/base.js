import ResourceFactory from 'app/utils/api';
import settings from 'app/config/settings';

const defaultConfig = {
    baseURL: settings.baseURL,
    headers: {
        'X-Request-With': 'XMLHttpRequest',
    },
};

ResourceFactory.updateDefaults(defaultConfig);

// Export it to use as a wiring mechanism for resources
export default ResourceFactory;
