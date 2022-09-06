import { assign, createMachine } from 'xstate';

export interface netflixStyleVideHoverContext {
  hasVideoLoaded: boolean;
}

export type netflixStyleVideHoverEvents =
  | {
      type: 'MOUSE_OVER';
    }
  | {
      type: 'MOUSE_OUT';
    }
  | {
      type: 'REPORT_VIDEO_LOADED';
    };

export const netflixStyleVideoHoverMachine = createMachine<
  netflixStyleVideHoverContext,
  netflixStyleVideHoverEvents
>(
  {
    predictableActionArguments: true,
    id: 'netflixStyleVideoHoverMachine',
    initial: 'idle',
    context: {
      hasVideoLoaded: false,
    },
    states: {
      idle: {
        on: {
          MOUSE_OVER: {
            target: 'showingVideo',
          },
          REPORT_VIDEO_LOADED: {
            actions: 'reportVideoLoaded',
          },
        },
      },
      showingVideo: {
        initial: 'checkingIfVideoHasLoaded',
        on: {
          MOUSE_OUT: {
            target: 'idle',
          },
        },
        states: {
          checkingIfVideoHasLoaded: {
            always: [
              {
                cond: 'hasLoadedVideo',
                target: 'waitingBeforePlaying',
              },
              {
                target: 'loadingVideoSrc',
              },
            ],
          },
          waitingBeforePlaying: {
            after: {
              2000: {
                target: 'autoPlayingVideo',
              },
            },
          },
          loadingVideoSrc: {
            initial: 'cannotMoveOn',
            onDone: {
              target: 'autoPlayingVideo',
            },
            states: {
              cannotMoveOn: {
                after: {
                  2000: {
                    target: 'canMoveOn',
                  },
                },
                on: {
                  REPORT_VIDEO_LOADED: {
                    actions: 'reportVideoLoaded',
                  },
                },
              },
              canMoveOn: {
                always: {
                  cond: 'hasLoadedVideo',
                  target: 'loaded',
                },
                on: {
                  REPORT_VIDEO_LOADED: {
                    actions: 'reportVideoLoaded',
                    target: 'loaded',
                  },
                },
              },
              loaded: {
                type: 'final',
              },
            },
          },
          autoPlayingVideo: {},
        },
      },
    },
  },
  {
    actions: {
      reportVideoLoaded: assign({
        hasVideoLoaded: true,
      }),
    },
    guards: {
      hasLoadedVideo: ctx => ctx.hasVideoLoaded,
    },
  }
);
