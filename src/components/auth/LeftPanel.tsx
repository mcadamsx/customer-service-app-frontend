import { FaLaptop, FaUserFriends } from 'react-icons/fa';
import {VscOrganization} from "react-icons/vsc";

const features = [
    {
        icon: <FaLaptop size={20} />,
        title: 'Visit our Support Center',
        desc: 'Get guidance from our support team.',
    },
    {
        icon: <FaUserFriends size={20} />,
        title: 'Join an Organization',
        desc: 'Empower your future with Us.',
    },
    {
        icon: <VscOrganization size={20}/>,
        title: 'Become an Organization',
        desc: 'Get the tools to manage your services.',
    },
];

const LoginLeftPanel = () => {
    return (
        <div className="flex flex-col justify-center space-y-6 w-full max-w-md mx-auto">
            {features.map((item, index) => (
                <div key={index} className="flex items-center gap-4  ">
                    <div className="text-white bg-white/10 p-4 rounded-lg">{item.icon}</div>
                    <div>
                        <h4 className="text-lg font-semibold">{item.title}</h4>
                        <p className="text-sm text-white/80">{item.desc}</p>
                    </div>
                    <span className="ml-auto text-white">→</span>
                </div>
            ))}
        </div>
    );
};

export default LoginLeftPanel;
