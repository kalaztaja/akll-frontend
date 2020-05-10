import axios from 'axios';

const postStore = {
  actions: {
    async submitPost(context, data) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + context.state.token;
        axios
          .post('/text/create', {
            title: data.title,
            location: data.location,
            fiText: data.fiText,
            enText: data.enText
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async getPostId(context, data) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + context.state.token;
        axios
          .get('/text/' + data.id + '/info')
          .then(response => {
            resolve(response.data);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    async updatePost(context, data) {
      return new Promise((resolve, reject) => {
        axios.defaults.headers.common['Authorization'] =
          'Bearer ' + context.state.token;
        axios
          .put('/text/' + data.id + '/update', {
            title: data.title,
            location: data.location,
            fiText: data.fiText,
            enText: data.enText
          })
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default postStore;
