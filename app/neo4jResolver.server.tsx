import neo4j from 'neo4j-driver';


const { NEO4J_URI, NEO4J_USERNAME, NEO4J_PASSWORD } = process.env

const driver = neo4j.driver(
    "neo4j://localhost:7687",
    neo4j.auth.basic(
      "neo4j",
      "your_password"
    )
  )

export async function resolveFamilies() {
  return read("MATCH (f:Actor) RETURN n LIMIT 300", {})
}

export async function resolveWallet(address : string) {
  return read("MATCH (n:Wallet) WHERE n.address = $address RETURN n LIMIT 25", {address: address});
}

export async function resolveWalletWithTransactions(address : string) {
  return read("MATCH (n:Wallet)-[type]->(t:Transaction) WHERE n.address = $address RETURN n,type,t", {address: address});
}

// lib/neo4j.js
export async function read(cypher : string, params = {}) {
    // 1. Open a session
    const session = driver.session()
  
    try {
      // 2. Execute a Cypher Statement
      const res = await session.executeRead(tx => tx.run(cypher, params))
  
      // 3. Process the Results
      const values = res.records.map(record => record.toObject())
  
      return values
    }
    finally {
      // 4. Close the session 
      await session.close()
    }
  }
  
  export async function write(cypher : string, params = {}) {
    // 1. Open a session
    const session = driver.session()
  
    try {
      // 2. Execute a Cypher Statement
      const res = await session.executeWrite(tx => tx.run(cypher, params))
  
      // 3. Process the Results
      const values = res.records.map(record => record.toObject())
  
      return values
    }
    finally {
      // 4. Close the session 
      await session.close()
    }
  }