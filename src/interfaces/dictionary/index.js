import { defineInterface } from '@directus/extension-sdk';
import Dictionary from './dictionary.vue';

export default defineInterface({
  id: 'dictionary',
  name: 'Dictionary',
  description: 'Enter values in a predefined list',
  icon: 'note_add',
  component: Dictionary,
  types: ['json'],
  options: [
    {
      field: 'dictionary',
      type: 'json',
      name: 'Dictionary',
      meta: {
        width: 'full',
        interface: 'list',
        options: {
          template: '{{ key }}',
          fields: [
            {
              field: 'key',
              type: 'string',
              name: 'Key',
              meta: {
                interface: 'input',
                options: {
                  placeholder: 'Add key...',
                },
              },
            },
            {
              field: 'description',
              type: 'text',
              name: 'Description',
              meta: {
                interface: 'textarea',
                options: {
                  placeholder: 'Add description...',
                },
              },
            },
          ],
        },
      },
    },
  ],
});
