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
    }
  }
};

export default postStore;
