/*
 * Api.js
 * This module is responsible for handling all the implementations of our http Request. This module uses Axios to configure the data handling
 */


import axios from 'axios';
import tmpl from 'string-template';
import qs from 'qs';
import * as Auth from 'app/utils/auth';


class ResourceFactory extends Object {
    // Factory class that generates resource classes. This is required to produce API endpoints. Each class will have the basic endpoints it needs

    static updateDefaults(config) {
        // update the defaults by taking whatever is there and adding the new stuff to it.
        ResourceFactory.defaults = ({...this.defaults, ...config});
    }

    static createResource(endpoint, config = {}) {
        // Generator function to create a resource class
        class Resource {
            // implement the http using axios
            static buildURL(pattern = '', data = {}) {
                // build the url out of the pattern and the data structure sent
                let stub = tmpl(pattern, data).replace(/\/+$/, '');
                return [this.endpoint, stub].join('/').replace(/\/+$/, '');
            }

            static executeRequest(data = {}, pattern='', method = 'GET') {
                // build and execute a request based on url pattern and method sent
                let url = this.buildURL(pattern, data);
                let config = {method, url};
                let key = method.toLowerCase() == 'get' ? 'params' : 'data';
                config[key] = data;

                return Auth.getAuthHeaders().then((headers) => {
                    config['headers'] = headers
                    return this.axios.request(config);
                });
            }

            static executeUploadRequest(file, data = {}, pattern='', name = 'file', method = 'POST') {
                // build and execute a request based on url pattern and method sent
                let url = this.buildURL(pattern, data);
                let config = {method, url};

                return Auth.getAuthHeaders().then((headers) => {
                    headers['content-type'] = 'multipart/form-data';
                    config['headers'] = headers

                    const formData = new FormData();
                    formData.append(name, file);

                    config['data'] = formData;

                    return this.axios.request(config);

                });
            }

            // Now implement all default methods
            static list(data = {}) {
                return this.executeRequest(data);
            }

            static get(data) {
                return this.executeRequest(data, '{id}');
            }

            static save(data, pattern = '{id}') {
                // If there's an ID, switch from a create to an update method
                return this.executeRequest(data, pattern, 'POST');
            }

            static remove(data, pattern = '{id}') {
                return this.executeRequest(data, pattern, 'DELETE');
            }

            static doAction(data, pattern = '{id}/{action}') {
                return this.executeRequest(data, pattern, 'POST');
            }

            static listResource(data, pattern = '{id}/{path}') {
                return this.executeRequest(data, pattern, 'GET');
            }

            static uploadFile(data, file, pattern = '{id}/{path}') {
                return this.executeUploadRequest(file, data, pattern);
            }

            // Additional functions can now be implemented and included into the mix

        }

        Resource.endpoint = endpoint;
        Resource.config = ({...ResourceFactory.defaults, ...config});
        Resource.axios = axios.create(Resource.config);

        return Resource;
    }
}

ResourceFactory.defaults = {
    paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'brackets', skipNulls: true, indices: false, encode: false});
    },
};

export default ResourceFactory;
