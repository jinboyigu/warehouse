import service from '../../utils/http';

const list = () => service.post('/?func=storage:list');

export default {
  list,
  create: data => service.post('/?func=storage:create', data),
  update: data => service.post('/?func=storage:update', data),
  delete: id => service.post('/?func=storage:delete', { id }),
};
