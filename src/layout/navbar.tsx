import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    DropdownItem,
    DropdownTrigger,
    Dropdown,
    DropdownMenu,
    Avatar,
  } from "@nextui-org/react";
import { useCookies } from "react-cookie";
import { InstaApi } from "../api";
import { useEffect, useState } from "react";
import { UserData } from "../interface/user";
import { useNavigate } from "react-router-dom";
  
  export const AcmeLogo = () => {
    return (
      <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
        <path
          clipRule="evenodd"
          d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
          fill="currentColor"
          fillRule="evenodd"
        />
      </svg>
    );
  };

  
  export default function AppNavbar() {
        const [ user, setUser ] = useState<UserData>()
        const [cookies, setCookies, removeCookies] = useCookies(['token'])
        const navigate = useNavigate()
        const fetchUser = async () => {
            const res = await InstaApi.getUser(cookies.token)
            try {
                const response = res.data
                setUser(response)
            } catch (error) {
                console.log(error)
            }
        }

        const onLogOut = async () => {
            InstaApi.logOut(cookies.token)
            setCookies("token", null)
            removeCookies("token", { path: '/' });
            navigate('login')
      }
    
        useEffect(()=>{
            fetchUser()
        },[])
        
    return (
      <Navbar isBordered>
        <NavbarContent justify="start">
          <NavbarBrand className="mr-4">
            <AcmeLogo />
            <p className="hidden sm:block font-bold text-inherit">InstaApp</p>
          </NavbarBrand>
        </NavbarContent>
  
        <NavbarContent as="div" className="items-center" justify="end">
          <Dropdown placement="bottom-end" className="dark">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                size="sm"
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
              />
            </DropdownTrigger>
            <DropdownMenu className="dark" aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">{user?.name}</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="settings">Profile</DropdownItem>
              <DropdownItem onPress={onLogOut} key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      </Navbar>
    );
  }
  