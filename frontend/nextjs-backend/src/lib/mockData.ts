interface iParams {
  pageSize?: number;
  pageNumber?: number;
}

export async function pricingData(params: iParams) {
  const data = [
    {
      id: 1,
      name: 'AirBNB Avg',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
    {
      id: 2,
      name: 'AirBNB Smart',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
    {
      id: 3,
      name: 'Booking.com',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
    {
      id: 4,
      name: 'Bayut',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
    {
      id: 5,
      name: 'Hotel 5',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
    {
      id: 6,
      name: 'HHr',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
    {
      id: 7,
      name: 'Our Price 10',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
    {
      id: 8,
      name: 'Our Price Daily',
      one: '$ 123',
      two: '$ 123',
      three: '$ 123',
      four: '$ 123',
      five: '$ 123',
      six: '$ 123',
      seven: '$ 123',
      eight: '$ 123',
      nine: '$ 123',
      ten: '$ 123',
      eleven: '$ 123',
      twelve: '$ 123',
    },
  ];

  const { pageSize = 10, pageNumber = 1 } = params;

  const startIndex = (pageNumber - 1) * pageSize;

  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  // return { nodes: paginatedData, pageInfo: { total: data.length } };
  return { nodes: paginatedData };
}

export async function reservationsData(params: iParams) {
  const data = [
    {
      id: '0001',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Paid',
    },
    {
      id: '0002',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Unpaid',
    },
    {
      id: '0003',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Paid',
    },
    {
      id: '0004',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Unpaid',
    },
    {
      id: '0005',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Paid',
    },
    {
      id: '0006',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Unpaid',
    },
    {
      id: '0007',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Paid',
    },
    {
      id: '0008',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Unpaid',
    },
    {
      id: '0009',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Paid',
    },
    {
      id: '0010',
      propertyName: 'Apartment 334',
      startDate: '01.01.2024',
      completionDate: '01.01.2024',
      amount: '345,00',
      deposit: '1 000,00',
      status: 'Unpaid',
    },
  ];

  const { pageSize = 10, pageNumber = 1 } = params;

  const startIndex = (pageNumber - 1) * pageSize;

  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return { nodes: paginatedData, pageInfo: { total: data.length } };
}

export async function ownersData(params: iParams) {
  const data = [
    {
      id: '0001',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0002',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0003',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0004',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0005',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0006',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0007',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0008',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0009',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
    {
      id: '0010',
      name: 'Bipin Shrestha',
      telephone: '+977 9876543210',
      email: 'bipin@shrestha.com',
    },
  ];

  const { pageSize = 10, pageNumber = 1 } = params;

  const startIndex = (pageNumber - 1) * pageSize;

  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  return { nodes: paginatedData, pageInfo: { total: data.length } };
}
