import { NextApiRequest, NextApiResponse } from 'next';
import { handleSubscribe } from '@/lib/server-actions';

export default async function subscribe(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, planId } = req.body;

  try {
    await handleSubscribe(userId, planId);
    res.status(200).json({ message: 'Subscription successful' });
  } catch (error) {
    res.status(500).json({ error: 'Subscription failed', details: error.message });
  }
} 