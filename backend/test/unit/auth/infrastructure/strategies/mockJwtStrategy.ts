
export class MockJwtStrategy  {
    
    async validate(payload: any): Promise<any> {
     
      const mockUser = {
        id: 1,
        username: 'johndoe',
      };
      return mockUser;
    }
  }