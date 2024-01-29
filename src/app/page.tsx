'use client';

import React from "react";
import styles from "./page.module.css";
import { BlocktankClient } from "@synonymdev/blocktank-lsp-http-client";

export default function Home() {
  const [value, setValue] = React.useState<string>();

  class BlocktankUrl {
    static localhost = 'http://localhost:9000/api';
    static staging = "https://api.stag.blocktank.to/blocktank/api/v2/";
  }

  const blocktankUrl = BlocktankUrl.staging;

  async function pullBlocktank() {
    const client = new BlocktankClient(blocktankUrl)
    const info = await client.getInfo();
    setValue(JSON.stringify(info, null, 2));
  }

  async function createOrder() {
    console.log('Create order click')
    const client = new BlocktankClient(blocktankUrl)
    try {
      const order = await client.createOrder(1000000000, 12);
      console.log('order', order)
    } catch (e) {
      console.error('Order creation failed', e)
    }
  }

  React.useEffect(() => {
    pullBlocktank()

  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <div>
          <p>Test blocktank client {blocktankUrl}</p>
          <pre>{value}</pre>

          <button onClick={() => {
            createOrder()
          }}>
            Create Order
          </button>
        </div>

      </div>
    </main>
  );
}
