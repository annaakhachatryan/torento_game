import React from 'react'
import { Route, Routes } from 'react-router'
import { Wrapper } from '../../pages/Wrapper/Wrapper'
import { HomePage } from '../../pages/HomePage/HomePage'
import { NewGame } from '../../pages/NewGame/NewGame'
import { Page2022 } from '../../pages/Page2022/Page2022'
import { Page2023 } from '../../pages/Page2023/Page2023'
import { Page2021 } from '../../pages/Page2021/Page2021'
import { Page2020 } from '../../pages/Page2020/Page2020'
import { Page2019 } from '../../pages/Page2019/Page2019'
import { Page2018 } from '../../pages/Page2018/Page2018'
import { Repack } from '../../pages/Repack/Repack'
import { ByNet } from '../../pages/ByNet/ByNet'
import { OnlineGame10 } from '../../pages/OnlineGame10/OnlineGame10'
import { Top100Game } from '../../pages/Top100Game/Top100Game'
import { RepackIgruha } from '../../pages/RepackIgruha/RepackIgruha'
import { VoiceActing } from '../../pages/VoiceActing/VoiceActing'
import { JdemVxoda } from '../../pages/JdemVxoda/JdemVxoda'
import { ReparkOxataba } from '../../pages/ReparkOxataba/ReparkOxataba'
import { ReparkAmexanikov } from '../../pages/ReparkAmexanikov/ReparkAmexanikov'
import { CommentsPage } from '../../pages/CommentsPage/CommentsPage'
import { Visits } from '../../pages/Visits/Visits'
import { LastComments } from '../../pages/LastComments/LastComments'
import './AppRouter.css'
import { HomePageID } from '../HomePageID/HomePageID'
import { Registration } from '../../pages/Registration/Registration'

export const AppRouter = () => {
    return (
        <div className='AppRouter'>
            <Routes>
                <Route path='/' element={<Wrapper/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path='/:id' element={<HomePageID/>} />
                    <Route path='newGames/' element={<NewGame/>} />
                    <Route path='games-2022/' element={<Page2022/>} />
                    <Route path='games-2023/' element={<Page2023/>} />
                    <Route path='repack-by-igruha/' element={<Repack/>} />
                    <Route path='igry-po-seti/' element={<ByNet/>} />
                    <Route path='top10/' element={<OnlineGame10/>} />
                    <Route path='top100/' element={<Top100Game/>} />
                    <Route path='russian/' element={<VoiceActing/>} />
                    <Route path='repack/' element={<RepackIgruha/>} />
                    <Route path='zhdem-vyhoda/' element={<JdemVxoda/>} />
                    <Route path='repack-otxataba/' element={<ReparkOxataba/>} />
                    <Route path='repack-ot-mechanics/' element={<ReparkAmexanikov/>} />
                    <Route path='games-2021/' element={<Page2021/>} />
                    <Route path='games-2020/' element={<Page2020/>} />
                    <Route path='games-2019/' element={<Page2019/>} />
                    <Route path='games-2018/' element={<Page2018/>} />
                    <Route path='CommentsPage/' element={<CommentsPage/>} />
                    <Route path='Comments/' element={<LastComments/>} />
                    <Route path='Visits/' element={<Visits/>} />
                    <Route path='registration/' element={<Registration/>} />
                </Route>
            </Routes>
        </div>
    )
}
