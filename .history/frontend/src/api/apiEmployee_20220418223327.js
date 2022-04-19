import axiosClient from './axiosClient';

const employeesApi = {
  getAll() {
    const url = '/employees';
    return axiosClient.get(url);
  },
  addEmployee(data) {
    const url = '/employees';
    return axiosClient.post(url, data);
  },
  removeEmployeeByID(_id) {
    const url = `employees/${_id}`;
    return axiosClient.delete(url);
  },
  updateEmployee(data) {
    if (!data) return;
    const url = `/employees/${data._id}`;
    return axiosClient.put(url, data);
  },
};
export default employeesApi;
