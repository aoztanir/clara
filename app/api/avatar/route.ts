// file uses HeyGen API and WebRTC protocol to have live conversations with the user

// import necessary libraries
// I'm having trouble importing these -- potential fixes???
// import { NextRequest } from 'next/server';
// import OpenAI from 'openai';
// import { StreamingAvatar, AvatarQuality } from '@heygen/streaming-avatar';

// export const runtime = 'edge';

// // safely retrive env variables
// function getEnvVar(name: keyof NodeJS.ProcessEnv): string {
//     const value = process.env[name];
//     if (!value) {
//         throw new Error(`Missing required environment variable: ${name}`);
//     }
//     return value;
// }

// // init OpenAI key value with safe env var
// const openai = new OpenAI({
//     apiKey: getEnvVar('OPENAI_API_KEY')
// });

// // interface for WebRTC session
// interface WebRTCSession {
//     sessionId: string;
//     sdp: any;
//     ice: any;
// }

// // start WebRTC session for live interaction with character
// // using the new app edge functions of Next.js 13.2 and up
// export async function GET(request: NextRequest) {
//     try {
//         const streamingAvatar = new StreamingAvatar({ 
//             token: getEnvVar('HEYGEN_API_TOKEN')
//         });

//         const sessionInfo = await streamingAvatar.getWebRTCSession({
//             quality: AvatarQuality.Medium,
//             avatarName: getEnvVar('AVATAR_ID'),
//             voice: {
//                 voiceId: getEnvVar('VOICE_ID'),
//                 rate: 1.2,
//             }
//         });

//         return new Response(
//             JSON.stringify({
//                 status: 'success',
//                 sessionId: sessionInfo.sessionId,
//                 sdp: sessionInfo.sdp,
//                 ice: sessionInfo.ice
//             }), {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     } catch (error: any) {
//         return new Response(
//             JSON.stringify({ 
//                 status: 'error', 
//                 message: error.message 
//             }), {
//                 status: 500,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     }
// }

// // start WebRTC session 
// export async function POST(request: NextRequest) {
//     try {
//         const { sessionId, localSdp, message } = await request.json();

//         const streamingAvatar = new StreamingAvatar({ 
//             token: getEnvVar('HEYGEN_API_TOKEN')
//         });

//         // Establish WebRTC connection
//         await streamingAvatar.startWebRTCConnection({
//             sessionId,
//             localSdp
//         });

//         // Get OpenAI response
//         const completion = await openai.chat.completions.create({
//             messages: [{ role: "user", content: message }],
//             model: getEnvVar('GPT_MODEL'),
//         });

//         // Send speech task to avatar
//         await streamingAvatar.sendTask({
//             sessionId,
//             task: {
//                 type: 'speech',
//                 text: completion.choices[0].message.content
//             }
//         });

//         return new Response(
//             JSON.stringify({ 
//                 status: 'success',
//                 response: completion.choices[0].message.content 
//             }), {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     } catch (error: any) {
//         return new Response(
//             JSON.stringify({ 
//                 status: 'error', 
//                 message: error.message 
//             }), {
//                 status: 500,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     }
// }

// // handle ICE conection for WebRTC application
// // basically ensures that both users are able to use a common connection protocol 
// export async function PUT(request: NextRequest) {
//     try {
//         const { sessionId, iceCandidate } = await request.json();

//         const streamingAvatar = new StreamingAvatar({ 
//             token: getEnvVar('HEYGEN_API_TOKEN')
//         });

//         await streamingAvatar.addICECandidate({
//             sessionId,
//             iceCandidate
//         });

//         return new Response(
//             JSON.stringify({ status: 'success' }), {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     } catch (error: any) {
//         return new Response(
//             JSON.stringify({ 
//                 status: 'error', 
//                 message: error.message 
//             }), {
//                 status: 500,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     }
// }

// // close WebRTC connection when the user is finished communicating with the model 
// export async function DELETE(request: NextRequest) {
//     try {
//         const { sessionId } = await request.json();
        
//         const streamingAvatar = new StreamingAvatar({ 
//             token: getEnvVar('HEYGEN_API_TOKEN')
//         });

//         await streamingAvatar.closeConnection(sessionId);

//         return new Response(
//             JSON.stringify({ status: 'success' }), {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     } catch (error: any) {
//         return new Response(
//             JSON.stringify({ 
//                 status: 'error', 
//                 message: error.message 
//             }), {
//                 status: 500,
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             }
//         );
//     }
// }


