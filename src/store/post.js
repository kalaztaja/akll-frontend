import axios from 'axios';

const postStore = {
  actions: {
    async submitPost(context, data) {
      const res = await axios.post('/text/create', data);
      return res.data;
    },
    async getPostId(context, data) {
      const res = await axios.get('/text/' + data.id + '/info');
      return res.data;
    },
    async updatePost(context, data) {
      const res = await axios.put('/text/' + data.id + '/update', data);
      return res.data;
    }
  }
};

export default postStore;
