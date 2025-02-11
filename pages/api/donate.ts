// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import type { NextApiRequest, NextApiResponse } from "next";
import { ActionError } from "./actions";

export interface ActionPostResponse {
    /** base64 encoded serialized transaction */
    transaction: string;
    /** describes the nature of the transaction */
    message?: string;
  }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ActionPostResponse | ActionError>,
) {
  try {
  if (req.method == 'OPTIONS') {
    return res.status(200).end();   
  } else if (req.method == 'POST') {
    const connection = new Connection('https://nonah-735t00-fast-mainnet.helius-rpc.com')
    const recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      const amount = Number(req.query.amount);
      const transaction = new Transaction().add(
          SystemProgram.transfer({
              fromPubkey: new PublicKey(req.body.account),
              toPubkey: new PublicKey('FPWQhdp1NeasvAzt2xzVNa3U1sRLYW5NLoRKSBE98sok'),
              lamports: amount * LAMPORTS_PER_SOL
          })
      )

      transaction.recentBlockhash = recentBlockhash;
      transaction.feePayer = new PublicKey(req.body.account);
  
      const serializedTransaction = transaction.serialize({requireAllSignatures: false});
      const txString = serializedTransaction.toString('base64')

      res.status(200).json({ transaction: txString, message: `Thanks for betting ${req.query.amount} SOL towards your team! 🔮` });   
      return res;
    } else if (req.method == 'GET') {
      return res.status(200).end();
    }
  } catch (err) {
    if (typeof err === 'string') {
      res.status(500).json({ message: err });
      return res;  
    }
  }
}
