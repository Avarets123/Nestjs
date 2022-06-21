import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWithAuthenticated } from "../../hooks";
import { IResProfile, IResRegisterOrLogin } from "../../interfaces";
import { addUser, logout } from "../../reducer/authStore";
import { isNotEmpty } from "../../utils";


const Profile = (): JSX.Element => {
    const dispatch = useDispatch();

    const store: IResRegisterOrLogin = useSelector((store: any) => store.authStore);
    const [profile, setProfile] = useState<IResProfile>();

    useEffect(() => {
        dispatch(addUser())
    }, [])

    useEffect(() => {


        (async function () {
            const res = await fetchWithAuthenticated('user', store.token);
            console.log(res)
            if (!isNotEmpty(res)) {
                localStorage.removeItem('user');
                dispatch(logout())
                return;
            }
            setProfile(res);
        })();

    }, [])


    if (isNotEmpty(profile)) {

        return (
            <>
                <div className="container">

                    <div style={{ marginTop: '4rem' }}>
                        Имя: {profile?.user.name ?? null}
                    </div>
                    <div style={{ marginTop: '4rem' }}>
                        email: {profile?.user.email ?? null}
                    </div>
                    <div style={{ marginTop: '4rem' }}>
                        Подписан на группы: {(profile?.followGroup.map((el: string, i: number) => <span key={i}>{el}, </span>)) ?? null}
                    </div>
                    <div style={{ marginTop: '4rem' }}>
                        создано групп: {(profile?.user.createGroup.map((el: any, i) => <span key={i}>{el.name}, </span>)) ?? null}
                    </div>
                    <div style={{ marginTop: '4rem' }}>

                        друзья: {(profile?.friends.map((el: any, i) => <span key={i}>{el}, </span>)) ?? null}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>

        </>
    )
};


export default Profile