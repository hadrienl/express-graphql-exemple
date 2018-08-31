module.exports = {
  all({ page, perPage, sortedBy }) {
    console.log(page, perPage, sortedBy);
    return ['Coin'];
  },
  post({ id }, { client }) {
    console.log(client);
    return `the post ${id}`
  },
};
