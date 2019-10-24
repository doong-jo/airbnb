

const buttonWithModal = () => {
    const [firstModaIOpen, firstOpenModal] = useState(false);
    const firstToggle = () => {
        firstOpenModal(!firstModaIOpen);
    };

    const [secondModalOpen, secondOpenModal] = useState(false);
    const secondToggle = () => {
        secondOpenModal(!secondModalOpen);
    };

    return (
        <>
            <h1>Relative Modal</h1>
            <div>
                <div>
                    <span>
                        <Button color="primary" onClick={firstToggle}>
                            target1
                        </Button>
                        <RelativeModal
                            isOpen={firstModaIOpen}
                            width={"15rem"}
                            toggle={firstToggle}
                            content={
                                <>
                                    Content1Content1Content1Content1Content1Content1Content1Content1Content1
                                </>
                            }
                            cancleText={"Cancle"}
                            confirmText={"Confirm"}
                        />
                    </span>
                </div>

                <div>
                    <span>
                        <Button color="primary" onClick={secondToggle}>
                            target2
                        </Button>
                        <RelativeModal
                            isOpen={secondModalOpen}
                            width={"15rem"}
                            toggle={secondToggle}
                            content={
                                <>
                                    Content2Content2Content2Content2Content2Content2Content2Content2Content2
                                </>
                            }
                            cancleText={"Cancle"}
                            confirmText={"Confirm"}
                        />
                    </span>
                </div>
            </div>
        </>
    );
};
