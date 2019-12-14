import CSVconverter from './CSVconverter';

jest.mock('papaparse', () => ({
  parse: jest.fn(),
}));

describe('CSVconverter testing', () => {
  it('mount test', () => {
    const mockFunk = jest.fn();
    const data = {
      item: [
        {
          selection: [],
          response: [{ respondant_number: 1, content: 'test' }],
        },
      ],
    };

    CSVconverter(mockFunk, data);
  });
});
