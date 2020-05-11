import axios from 'axios';

const postStore = {
  actions: {
    async submitPost(context, data) {
      return new Promise((resolve, reject) => {
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
      const res = axios.get('/text/' + data.id + '/info');
      return res.data;
    },
    async updatePost(context, data) {
      const res = axios.put('/text/' + data.id + '/update', data);
      return res.data;
    }
  }
};

export default postStore;
