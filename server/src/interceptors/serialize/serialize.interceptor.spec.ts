import { SerializeInterceptor } from './serialize.interceptor';

describe('SerializeInterceptor', () => {
  it('should be defined', () => {
    class TestDto {}
    expect(new SerializeInterceptor(TestDto)).toBeDefined();
  });
});
