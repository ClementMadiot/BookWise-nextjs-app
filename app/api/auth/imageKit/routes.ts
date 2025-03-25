import config from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

// create a new instance of the ImageKit SDK
const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imagekit = new ImageKit({
  publicKey: publicKey,
  privateKey: privateKey,
  urlEndpoint: urlEndpoint,
});

export async function GET() {
  // return all the authentication parameters required by the client
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
