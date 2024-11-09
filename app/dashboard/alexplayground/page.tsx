"use client";
import InteractiveAvatar from '../../../components/AvatarChatInterface';

// React component to export a video dashboard with Avatar
export default function AlexPage (){
    return (
        <div className="w-screen h-screen flex flex-col">
      <div className="w-[900px] flex flex-col items-start justify-start gap-5 mx-auto pt-4 pb-20">
        <div className="w-full">
          <InteractiveAvatar />
        </div>
      </div>
    </div>
  );
}