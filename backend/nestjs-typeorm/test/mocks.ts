import { v4 as uuidv4 } from 'uuid';

export const mockFindOne = ({ repository, data }) => {
  jest.spyOn(repository, 'findOne').mockResolvedValueOnce(data);
};

export const mockCreateAndSave = ({ repository, data }) => {
  jest.spyOn(repository, 'create').mockResolvedValueOnce({});
  jest.spyOn(repository, 'save').mockResolvedValueOnce({ ...data, id: uuidv4() });
};
