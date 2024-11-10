// StreamingEmbed.tsx
import { FC, useEffect } from 'react';

interface MessageEvent {
  origin: string;
  data: {
    type: string;
    action: 'init' | 'show' | 'hide';
  };
}

interface StreamingEmbedProps {
  className?: string;
}

const StreamingEmbed: FC<StreamingEmbedProps> = ({ className }) => {
  useEffect(() => {
    // Type definitions for DOM elements
    const host: string = 'https://labs.heygen.com';
    const url: string =
      host +
      '/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJlZjA4MDM5YTQxMzU0ZWQ1YTIwNTY1ZGI4%0D%0AOTkzNzNmMyIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3Yz%0D%0AL2VmMDgwMzlhNDEzNTRlZDVhMjA1NjVkYjg5OTM3M2YzL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0%0D%0ALndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjU5%0D%0AYmM3MjQ3MDc1OTRhOTliMGIzMzA5ZDQwOTczMmQxIiwidXNlcm5hbWUiOiJlOTg2ODRmMjA5NDQ0%0D%0ANGE0YmRmOTY1YjM5MmYyODg2NiJ9&inIFrame=1'
    const initializeEmbed = (): (() => void) => {
      const clientWidth: number = document.body.clientWidth;

      // Create and configure wrapper div
      const wrapDiv: HTMLDivElement = document.createElement('div');
      wrapDiv.id = 'heygen-streaming-embed';
      if (className) wrapDiv.className = className;

      // Create container div
      const container: HTMLDivElement = document.createElement('div');
      container.id = 'heygen-streaming-container';

      // Create and configure stylesheet
      const stylesheet: HTMLStyleElement = document.createElement('style');
      stylesheet.innerHTML = `
        #heygen-streaming-embed {
          // z-index: 9999;
          position: absolute;
          top: 100px;
          left: 100px;
          width: 500px;
          height: 300px;
          // border-radius: 50%;
          // border: 2px solid #fff;
          // box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
          transition: all linear 0.1s;
          overflow: hidden;
          opacity: 0;
          visibility: hidden;
        }
        #heygen-streaming-embed.show {
          opacity: 1;
          visibility: visible;
        }
        #heygen-streaming-embed.expand {
          ${clientWidth < 540 
            ? "height: 266px; width: 50%; left: 62.5%; transform: translateX(-50%);" 
            : "height: 366px; width: calc(366px * 16 / 9); left: 62.5%; transform: translateX(-50%);"}
          border: 0;
          border-radius: 8px;
        }
        #heygen-streaming-container {
          width: 100%;
          height: 100%;
        }
        #heygen-streaming-container iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }
      `;

      // Create and configure iframe
      const iframe: HTMLIFrameElement = document.createElement('iframe');
      iframe.allowFullscreen = false;
      iframe.title = 'Streaming Embed';
      iframe.setAttribute('role', 'dialog');
      iframe.allow = 'microphone';
      iframe.src = url;

      // State variables
      let visible: boolean = false;
      let initial: boolean = false;

      // Message event handler
      const handleMessage = (e: MessageEvent): void => {
        if (e.origin === host && e.data?.type === 'streaming-embed') {
          switch (e.data.action) {
            case 'init':
              initial = true;
              wrapDiv.classList.toggle('show', initial);
              break;
            case 'show':
              visible = true;
              wrapDiv.classList.toggle('expand', visible);
              break;
            case 'hide':
              visible = false;
              wrapDiv.classList.toggle('expand', visible);
              break;
          }
        }
      };

      // Add event listener
      window.addEventListener('message', handleMessage as unknown as EventListener);

      // Append elements
      container.appendChild(iframe);
      wrapDiv.appendChild(stylesheet);
      wrapDiv.appendChild(container);
      document.body.appendChild(wrapDiv);

      // Return cleanup function
      return () => {
        window.removeEventListener('message', handleMessage as unknown as EventListener);
        const embed = document.getElementById('heygen-streaming-embed');
        if (embed) {
          document.body.removeChild(embed);
        }
      };
    };

    const cleanup = initializeEmbed();

    // Cleanup on component unmount
    return () => {
      cleanup();
    };
  }, [className]);

  return null;
};

export default StreamingEmbed;
