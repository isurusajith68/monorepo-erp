import { jwtVerify } from 'jose'

export const verifySessionToken = async (token: string | undefined) => {
  if (!token) return null

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET as string)

    const { payload } = await jwtVerify(token, secret)

    if (!payload) return null

    return payload
  } catch (error) {
    console.error('Invalid token', error)
    return null
  }
}
