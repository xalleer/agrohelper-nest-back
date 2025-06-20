export const jwtConfig = {
  secret: process.env.JWT_SECRET || 'super-secret-key',
  signOptions: { expiresIn: '7d' },
};