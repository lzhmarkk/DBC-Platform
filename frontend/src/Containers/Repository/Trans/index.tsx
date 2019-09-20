import React, {useState} from "react";
import {Steps, Button, Result} from "antd";
import Step0form from "../../../Components/Repository/Trans/form0";
import Step1form from "../../../Components/Repository/Trans/form1";
import Step2form from "../../../Components/Repository/Trans/form2";
import Step3form from "../../../Components/Repository/Trans/form3";
import styles from "../index.module.scss"
import {prods, repoItems, repos} from "../index";

const {Step} = Steps;

const PageRepositoryTrans = () => {
    const [step, setStep] = useState(0);
    const [formInfo, setFormInfo] = useState<any>({});
    const [repoOutId, setRepoOutId] = useState("");
    const getName = (id: string) => {
        const name = repos.filter(k => k.repo_id == id).pop();
        return name == undefined ? "" : name.name;
    };
    const getName2 = (id: string) => {
        const name = prods.filter(k => k.prod_id == id).pop();
        return name == undefined ? "" : name.prod_name;
    };

    const step0Form = <div className={styles.stepForm}>
        <Step0form
            repos={repos}
            onSubmit={(e) => {
                setStep(1);
                setFormInfo({...formInfo, ...e});
                setRepoOutId(e.repo_out_id);
            }}/>
    </div>;
    const step1Form = <div className={styles.stepForm}>
        <Step1form
            repo_out_id={repoOutId}
            prods={prods.filter(s => repoItems.filter(k => k.repo_id == repoOutId).map(e => e.prod_id).indexOf(s.prod_id) != -1)}
            repo_prods={repoItems.filter(k => k.repo_id == repoOutId)}
            onBack={() => setStep(0)}
            onSubmit={(e) => {
                setStep(2);
                setFormInfo({...formInfo, ...e});
            }}/>
    </div>;
    const step2Form = <div className={styles.stepForm}>
        <Step2form
            repos={repos}
            repo_out_id={repoOutId}
            onSubmit={(e) => {
                setStep(3);
                setFormInfo({...formInfo, ...e});
            }}/>
    </div>;
    const step3Form = <div className={styles.stepForm}>
        <Result
            status="success"
            title="成功发起调库申请"
            subTitle={`从${getName(formInfo.repo_out_id)}调动${formInfo.quantity_out}个/箱${getName2(formInfo.prod_out_id)}到${getName(formInfo.repo_in_id)}`}
            extra={[
                <Button type="primary" key="console"> 查看转入管理 </Button>,
                <Button key="continue" onClick={() => setStep(0)}> 继续</Button>,
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