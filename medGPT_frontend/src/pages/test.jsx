return (
    <Box p={8} maxWidth="800px" mx="auto">
        <Heading as="h1" mb={6} textAlign="center">
            Ежедневный Опрос
        </Heading>
        {errorMessage && (
            <Alert status="error" mb={4}>
                <AlertIcon />
                {errorMessage}
            </Alert>
        )}
        {successMessage && (
            <Alert status="success" mb={4}>
                <AlertIcon />
                {successMessage}
            </Alert>
        )}
        <VStack spacing={6} align="stretch">
            <Box>
                <Text fontWeight="bold">Возраст:</Text>
                <Input type="text" value={age} onChange={handleInputChange(setAge)} />
            </Box>
            <Box>
                <Text fontWeight="bold">Индекс массы тела (BMI):</Text>
                <Input type="text" value={bmi} onChange={handleInputChange(setBmi)} />
            </Box>
            <Box>
                <Text fontWeight="bold">Количество шагов:</Text>
                <Input type="text" value={steps} onChange={handleInputChange(setSteps)} />
            </Box>
            <Box>
                <Text fontWeight="bold">Часы сна:</Text>
                <Input
                    type="text"
                    value={sleepHours}
                    onChange={handleInputChange(setSleepHours)}
                />
            </Box>
            <Box>
                <Text fontWeight="bold">Время перед экраном (часы):</Text>
                <Input
                    type="text"
                    value={screenTime}
                    onChange={handleInputChange(setScreenTime)}
                />
            </Box>
            <Box>
                <Text fontWeight="bold">Настроение (от 0 до 5):</Text>
                <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={mood}
                    onChange={(value) => setMood(value)}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box>
                <Text fontWeight="bold">Уровень симптомов (от 1 до 5):</Text>
                <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={symptomLevel}
                    onChange={(value) => setSymptomLevel(value)}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Box>
                <Text fontWeight="bold">Тренд самочувствия:</Text>
                <Select
                    placeholder="Выберите тренд самочувствия"
                    value={feelTrend}
                    onChange={(e) => setFeelTrend(e.target.value)}
                >
                    <option value="хуже">Хуже</option>
                    <option value="также">Также</option>
                    <option value="лучше">Лучше</option>
                </Select>
            </Box>
            <Box>
                <Text fontWeight="bold">Придерживание медикаментозной терапии:</Text>
                <Select
                    placeholder="Выберите уровень"
                    value={medicationAdherence}
                    onChange={(e) => setMedicationAdherence(e.target.value)}
                >
                    <option value="не соблюдается">Не соблюдается</option>
                    <option value="частично соблюдается">Частично соблюдается</option>
                    <option value="полностью соблюдается">Полностью соблюдается</option>
                </Select>
            </Box>
            <Box>
                <Text fontWeight="bold">Побочные эффекты (от 0 до 5):</Text>
                <Slider
                    min={0}
                    max={5}
                    step={1}
                    value={sideEffects}
                    onChange={(value) => setSideEffects(value)}
                >
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>
            </Box>
            <Button colorScheme="teal" onClick={handleSubmit} isLoading={isLoading}>
                Отправить данные
            </Button>
        </VStack>
    </Box>
);
};

export default QuizPage;