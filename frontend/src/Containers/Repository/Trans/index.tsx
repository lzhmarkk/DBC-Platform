import React, {useState} from "react";
import {Steps, Button, Result} from "antd";
import Step0form from "../../../Components/Repository/Trans/form0";
import Step1form from "../../../Components/Repository/Trans/form1";
import Step2form from "../../../Components/Repository/Trans/form2";
import Step3form from "../../../Components/Repository/Trans/form3";
import styles from "../index.module.scss"
import transApiData from "../../../Assets/mockingApiData/Repository/trans";

const {Step} = Steps;

const PageRepositoryTrans = () => {
    const repos = transApiData.Repo;
    const [step, setStep] = useState(0);
    const [formInfo, setFormInfo] = useState<any>({});
    const [repoOut, setRepoOut] = useState<any>(repos[0]);

    const step0Form = <div className={styles.stepForm}>
        <Step0form
            repos={repos}
            onSubmit={(e) => {
                setStep(1);
                setFormInfo({...formInfo, ...e});
                setRepoOut(repos.filter(k => k.repo_id == e.repo_out_id)[0]);
            }}/>
    </div>;
    const step1Form = <div className={styles.stepForm}>
        <Step1form
            repo_out_id={repoOut.repo_id}
            prods={repoOut.RepoItem}
            onBack={() => setStep(0)}
            onSubmit={(e) => {
                setStep(2);
                setFormInfo({...formInfo, ...e});
            }}/>
    </div>;
    const step2Form = <div className={styles.stepForm}>
        <Step2form
            repos={repos}
            repo_out_id={repoOut.repo_id}
            onSubmit={(e) => {
                setStep(3);
                setFormInfo({...formInfo, ...e, "direction": "TRANS"});
            }}/>
    </div>;
    const step3Form = <div className={styles.stepForm}>
        <Result
            status="success"
            title="成功发起调库申请"
            subTitle={`从${formInfo.repo_out_id}调动${formInfo.quantity}个/箱${formInfo.prod_out_id}到${formInfo.repo_in_id}`}
            extra={[
                <Button type="primary" key="console" onClick={() => console.log(formInfo)}>
                    查看转入管理
                </Button>,
                <Button key="continue" onClick={() => setStep(0)}>
                    继续
                </Button>,
            ]}
        />
    </div>;
    return (
        <div className={styles.root}>
            <Steps current={step} style={{padding: "20px 20px"}}>
                <Step title="选择转出仓库" description="请选择产品从哪个仓库被移出"/>
                <Step title="填写数量及属性" description="请填写调库相关信息"/>
                <Step title="选择转入仓库" description="请选择产品将被加入到哪个仓库"/>
                <Step title="完成调库" description="完成调库"/>
            </Steps>
            <div className={styles.formArea}>
                {step == 0 ? step0Form : step == 1 ? step1Form : step == 2 ? step2Form : step3Form}
            </div>
        </div>
    )
};
export default PageRepositoryTrans;