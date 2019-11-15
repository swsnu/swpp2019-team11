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
          response: [],
        },
      ],
    };

    CSVconverter(mockFunk, data, true);
    CSVconverter(mockFunk, data, false);
  });
});
