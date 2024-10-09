import { ImageResponse } from 'next/og';
import Logo from './LogoOG';

export type Props = {
    title?: string;
};

export default async function OpengraphImage(props?: Props): Promise<ImageResponse> {
    const title = props?.title ?? 'Fast Uploads';

    return new ImageResponse(
        (
            <div style={{
                display: 'flex',
                height: '100%',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #f9f1ff)',
                fontSize: 60,
                letterSpacing: -2,
                fontWeight: 700,
                textAlign: 'center',
            }}
                tw="bg-blue-500" >
                <div tw="flex flex-none items-center justify-center bg-blue-700 w-screen py-6 ">
                    <Logo />
                </div>
                <p
                    // style={{
                    //     backgroundImage: 'linear-gradient(90deg, rgb(0, 124, 240), rgb(0, 223, 216))',
                    //     backgroundClip: 'text',
                    //     color: 'transparent',
                    // }}
                    tw="mt-12 text-7xl font-bold text-blue-500">
                    {title}
                </p>
            </div>

        ),
        {
            width: 1200,
            height: 630,
        }
    );
}