import create from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
console.log(subscribeWithSelector);

export default create(
  subscribeWithSelector((set) => {
    return {
      lightmode: false,
      setLightMode: () => {
        set(() => {
          return { lightmode: true };
        });
      },
      setDarkMode: () => {
        set(() => {
          return { lightmode: false };
        });
      },
      editmode: false,
      setEditMode: () => {
        set(() => {
          return { editmode: true };
        });
      },
      setFreeMode: () => {
        set(() => {
          return { editmode: false };
        });
      },
      sneakerSelector: "primary",
      setPrimaryColor: () =>
        set(() => {
          return { sneakerSelector: "primary" };
        }),
      setSecondaryColor: () =>
        set(() => {
          return { sneakerSelector: "secondary" };
        }),
      setThirdColor: () =>
        set(() => {
          return { sneakerSelector: "third" };
        }),
      setLacesColor: () =>
        set(() => {
          return { sneakerSelector: "laces" };
        }),
      currentColor: "#ffffff",
      setCurrentColor: (color) => {
        set(() => {
          return { currentColor: color };
        });
      },
      helper: 0,
      callHelper: () =>
        set((state) => {
          return { helper: state.helper + 1 };
        }),
      colorIsSelected: false,
      setColorIsSelected: () => {
        set(() => {
          return { colorIsSelected: true };
        });
      },
    };
  })
);
