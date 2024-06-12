import mongoose from 'mongoose';

export const mockFindOneLeanSelect = ({ model, data }) => {
  jest.spyOn(model, 'findOne').mockImplementationOnce(() => ({
    lean: jest.fn().mockImplementationOnce(() => ({
      select: jest.fn().mockResolvedValueOnce(data),
    })),
  }));
};

export const mockCreate = ({ model, data }) => {
  jest
    .spyOn(model, 'create')
    .mockResolvedValueOnce({ ...data, _id: new mongoose.Types.ObjectId().toString() });
};
