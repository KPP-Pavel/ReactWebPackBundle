declare module '*.css' {
    const content: { [className: string]: string };
    export default content;
}
declare module '*.less' {
    const content: { [className: string]: string };
    export default content;
}
declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}
declare module '*.jpg' {
    const content: string;
    export default content;
}
declare module '*.svg' {
    const content: Function;
    export default content;
}
