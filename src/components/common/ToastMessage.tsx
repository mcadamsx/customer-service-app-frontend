import { message } from "antd";

const Toast = {
    success: (content: string) => {
        message.destroy();
        message.open({ type: "success", content });
    },

    error: (content: string) => {
        message.destroy();
        message.open({ type: "error", content });
    },

    warning: (content: string) => {
        message.destroy();
        message.open({ type: "warning", content });
    },

    info: (content: string) => {
        message.destroy();
        message.open({ type: "info", content });
    },
};

export default Toast;
