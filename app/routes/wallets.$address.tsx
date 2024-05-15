import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect } from "react"
import { resolveWallet } from "../neo4jResolver.server";
import Graphic from "~/shared/components/Graphic/index.client";
import { ClientOnly } from "remix-utils/client-only"




export const loader = async ( { params }) => {
  const wallet = await resolveWallet(params.address) ;
  const item = wallet[0].n;
  return json(item)
};

export default function Wallet() {
    const  wallet  = useLoaderData<typeof loader>();

    return (
        <>
                <div>{wallet.properties.address}</div>
                    <div>{wallet.properties.lastUpdate}</div>
                    <ClientOnly>
                        {() => 
                            <Graphic item={wallet}></Graphic>
                        }
                    </ClientOnly>
        </>
    );

}
