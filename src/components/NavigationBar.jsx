import { logo } from '../assets';
import { useUserAuth } from '../context/context';

const NavigationBar = () => {
    const { logOut, user } = useUserAuth();
    const handleLogout = async (e) => {
        e.preventDefault();
        document.getElementById('dp').blur();
        try {
            await logOut();
            navigate('/');
        } catch (e) {}
    };
    return (
        <nav className="px-10 pt-4 shadow-xl  navbar flex justify-between align-middle">
            <div className="flex-none">
                <a className="btn btn-ghost text-xl">
                    <div className="w-10 rounded-full">
                        <img src={logo} alt="logo" />
                    </div>
                    DRIVE
                </a>
            </div>
            {user && (
                <div tabIndex={0} className="flex-none">
                    <div className="dropdown dropdown-end ">
                        <div
                            tabIndex={0}
                            // role="button"
                            className="btn btn-ghost btn-circle avatar"
                        >
                            <img
                                className="w-10 rounded-full"
                                src={user.photoURL}
                                alt="logo"
                            />
                        </div>
                        <ul
                            id="dp"
                            tabIndex={0}
                            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <span onClick={() => {}}>
                                    Profile
                                    <span className="text-gray-600">
                                        (placeholder)
                                    </span>
                                </span>
                            </li>
                            <li>
                                <span onClick={handleLogout}>Logout </span>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default NavigationBar;
