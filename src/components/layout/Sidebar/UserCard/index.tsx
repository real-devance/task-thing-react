import { useEffect, useState } from 'react';
import UserEditForm from '../../../section/User/UserEditFrom';
import { DropdownOptions, DialogModal, Toast, ActionDialog } from '../../../ui';
import { useObservable } from 'dexie-react-hooks';
import useToast from '../../../../hooks/useToast';
import DB from '../../../../database/DB';
import DexieLogin from '../../../section/LoginCard/DexieLogin';
import { useNavigate } from 'react-router-dom';

type OptionType = "none" | "edit" | "logout" | "login";

function UserCard() {
    const [selectedOption, setSelectedOption] = useState<OptionType>("none"); // Tracks the current dropdown menu option
    const user = useObservable(DB.cloud.currentUser); // Observes the current user state from Dexie Cloud
    const navigator = useNavigate(); // Used for navigation to other routes
    const options = ["edit", user?.isLoggedIn ? "logout" : "login"]; // Dynamic options based on login state

    const { isVisible: toastVisible, showToast, hideToast } = useToast(); // Toast management
    const [toastMessage, setToastMessage] = useState(""); // Toast message content

    // Handle user login
    const handleLogin = async () => {
        try {
            await DB.cloud.login(); // Attempt login
        } catch (error) {
            showToast();
            setToastMessage("Login Failed"); // Show error if login fails
            setSelectedOption("none");
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            await DB.cloud.logout(); // Attempt logout
            navigator("/"); // Redirect to the home page after logout
        } catch (error) {
            showToast();
            setToastMessage("Logout Failed"); // Show error if logout fails
            setSelectedOption("none");
        }
    };

    // Handle dropdown menu option selection
    const handleOptions = (option: string) => {
        setSelectedOption(option as OptionType); // Update selected option
        if (option === "login") {
            handleLogin(); // Trigger login if selected
        }
    };

    // Reset selected option when user login state changes
    useEffect(() => {
        if (user?.isLoggedIn) {
            setSelectedOption("none");
        }
    }, [user]);

    return (
        <div className="flex justify-between flex-wrap gap-2 mb-4 bg-gray-300 dark:bg-gray-500 px-2 py-1 rounded-md">
            {/* User edit form, active if "edit" is selected */}
            <UserEditForm
                isEditing={selectedOption === "edit"}
                onSuccessful={() => setSelectedOption("none")}
                onError={() => setSelectedOption("none")}
            />

            {/* Dropdown menu for selecting actions */}
            <DropdownOptions
                options={options}
                onOption={handleOptions}
                menuBtn="horizontal"
                position="top"
            />

            {/* Modal for login form */}
            <DialogModal isOpen={selectedOption === "login"} onClose={() => setSelectedOption("none")}>
                <div className="bg-default w-80 xs:w-96 border-default rounded-md px-2 py-4">
                    <DexieLogin />
                </div>
            </DialogModal>

            {/* Confirmation dialog for logout */}
            <ActionDialog
                isOpen={selectedOption === "logout"}
                title="Are you sure you want to logout?"
                onCancel={() => setSelectedOption("none")}
                onConfirm={handleLogout}
                action="logout"
            />

            {/* Toast notification */}
            {toastVisible && (
                <Toast
                    isVisible={toastVisible}
                    duration={3000}
                    onClose={hideToast}
                    message={toastMessage}
                />
            )}
        </div>
    );
}

export default UserCard;
