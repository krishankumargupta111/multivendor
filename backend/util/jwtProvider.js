import jwt from 'jsonwebtoken';

export const jwtProvider = {
  createJwt(payload) {
    return jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: '24h' }
    );
  },

  getEmailFromJwt(token) {
    try {
    
      const decodedToken = jwt.verify(
        token,
        process.env.SECRET_KEY
      );

      return decodedToken.email;
    } catch (error) {
      console.log(error)
      throw new Error('Invalid token');
    }
  },

  verifyJwt(token) {
    try {
      return jwt.verify(
        token,
        process.env.SECRET_KEY
      );
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
};