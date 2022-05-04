import { TesctCss } from './Modules/TestCss/index'
import { TestImage } from './Modules/TestImages'
import { TesctLESS } from './Modules/TestLESS'
import { TesctSCSS } from './Modules/TestSCSS'


export const App = () => {
    return <>
        <div>hello REACT</div>
        <TesctCss />
        <TesctLESS />
        <TesctSCSS />
        <TestImage />
    </>
}