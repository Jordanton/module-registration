myApp.controller('MainController', function ($scope) {

        $scope.pageTitle = 'CS-4220 Midterm'
    })
    .controller('SignUpController', function ($scope) {

        $scope.isFormOpen = true
        $scope.isFormOpen2 = true

        $scope.moduleList = []

        $scope.addModule = () => {

            let
                duplicate = 0,
                newModule = {}

            $scope.moduleList.forEach((element) => {

                if (element.name.startsWith($scope.name.toUpperCase())) {
                    duplicate++
                }
            })

            if (duplicate === 0) {

                newModule = {
                    name: $scope.name.toUpperCase(),
                    website: $scope.website,
                    members: []
                }
            }
            else if (duplicate === 1) {

                $scope.moduleList.forEach((element) => {

                    if (element.name === $scope.name.toUpperCase()) {
                        element.name = element.name + ' - ' + 'Group ' + duplicate
                    }

                    newModule = {
                        name: $scope.name.toUpperCase() + ' - ' + 'Group ' + (duplicate + 1),
                        website: $scope.website,
                        members: []
                    }
                })
            }
            else {
                newModule = {
                    name: $scope.name.toUpperCase() + ' - ' + 'Group ' + (duplicate + 1),
                    website: $scope.website,
                    members: []
                }
            }

            $scope.moduleList.push(newModule)

            $scope.moduleList.sort((a, b) => {

                if (a.name < b.name) {
                    return -1
                }
                if (a.name > b.name) {
                    return 1
                }

                // names must be equal
                return 0
            })

            $scope.name = ''
            $scope.website = ''
        }

        $scope.deleteModule = (index) => {

            const deletedModule = $scope.moduleList[index].name
            const deletedNumber = $scope.getGroupNumber(deletedModule)

            $scope.moduleList.splice(index, 1)

            const moduleName = $scope.getModuleName(deletedModule)

            $scope.moduleList.forEach((element) => {

                if ($scope.getDuplicate(moduleName) === 0) {

                    if (element.name.startsWith(moduleName)) {
                        element.name = moduleName
                    }
                }
                else {

                    if (element.name.startsWith(moduleName)) {

                        const number = $scope.getGroupNumber(element.name)

                        if (number > deletedNumber) {
                            element.name = moduleName + ' - ' + 'Group ' + (number - 1)
                        }
                    }
                }
            })
        }

        $scope.getDuplicate = (moduleName) => {

            let duplicate = -1

            $scope.moduleList.forEach((element) => {

                if (element.name.startsWith(moduleName)) {
                    duplicate++
                }
            })

            return duplicate
        }

        $scope.getModuleName = (moduleName) => {

            if (moduleName.length > 10) {
                return moduleName.substring(0, (moduleName.length - 10))
            }
            else {
                return moduleName.substring(0, (moduleName.length - 1))
            }
        }

        $scope.getGroupNumber = (moduleName) => {

            return moduleName.substring((moduleName.length - 1), moduleName.length)
        }

        $scope.addStudent = () => {

            const newStudent = {
                firstname: $scope.firstname,
                lastname: $scope.lastname,
                email: $scope.email
            }

            const nameOfModule = $scope.chosenModule

            $scope.moduleList.forEach((element) => {

                if (element.name === nameOfModule) {
                    element.members.push(newStudent)
                }
            })

            $scope.firstname = ''
            $scope.lastname = ''
            $scope.email = ''
        }

        $scope.deleteStudent = (moduleIndex, index) => {

            $scope.moduleList[moduleIndex].members.splice(index, 1)
        }

    })
