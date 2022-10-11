import { NextPage } from "next";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, useCallback } from "react";
import {
  Group,
  Title,
  ThemeIcon,
  Select,
  Box,
  Text,
  Skeleton,
  Accordion,
  Table,
  Button,
  Modal,
  TextInput,
  LoadingOverlay,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { BiCategory } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { useGetCategories, usePostCategory } from "../queries/CategoryQueries";
import { useListState, useLogger } from "@mantine/hooks";
import { useQueryClient } from '@tanstack/react-query';

interface categoriesProps {}

const Categories: NextPage = ({}) => {
  const queryClient = useQueryClient();
  const { data: categories, isLoading, isError } = useGetCategories();
  const [selectData, dataHandlers] = useListState([]);
  const [selectValue, setSelectValue] = useState<string | null>();
  const [filterValues, filterHandlers] = useListState([]);
  const [accordionValue, setAccordionValue] = useState(null);
  const [createCategory, setCreateCategory] = useState(false);

  useEffect(() => {
    // setSelectData([]);
    if (categories) {
      const names = categories.map((category) => category.name);
      dataHandlers.setState(names);
    }
    // if (categories) {
    //   categories.map((category) =>
    //     setSelectData((selectData) => [...selectData, category.name])
    //   );
    // }
  }, [categories, dataHandlers]);

  useEffect(() => {
    filterHandlers.setState(categories);
    if (selectValue) {
      filterHandlers.filter((category) => category.name === selectValue);
    }
  }, [categories, filterHandlers, selectValue]);

  const createCategoryForm = useForm({
    validate: {},
    initialValues: {
      name: "",
    },
  });

  const {
    mutate: postCategory,
    isLoading: postCategoryLoading,
    isError: postCetegoryError,
  } = usePostCategory();


  useEffect(() => {
    console.log(postCetegoryError, postCategoryLoading)
  }, [postCetegoryError, postCategoryLoading])

  return (
    <main>
      <Group align="center" mb="2.5rem">
        <Title size="1.5rem" weight="500">
          Your Categories
        </Title>
        <ThemeIcon variant="light" color="green" size="md">
          <BiCategory size={25} />
        </ThemeIcon>
      </Group>

      <Select
        data={selectData}
        value={selectValue}
        onChange={setSelectValue}
        clearable
        searchable
        nothingFound="No Categories Found"
        icon={<FiSearch />}
        transition="pop-top-left"
        transitionDuration={80}
        transitionTimingFunction="ease"
        sx={{ maxWidth: "600px" }}
        mb="1.5rem"
      />

      {categories?.length === 0 && !isLoading && (
        <Box>
          <Group align="center">
            <Text size="lg">No Inventory/Category is found.</Text>
            <FiSearch size={20} />
          </Group>
        </Box>
      )}

      <Skeleton
        mb="3rem"
        // visible={true}
        visible={isLoading ?? false}
        style={{ minHeight: "80px" }}
        animate
      >
        <Accordion
          value={accordionValue}
          onChange={setAccordionValue}
          transitionDuration={500}
        >
          {filterValues?.map((category, index) => (
            <Accordion.Item
              value={category.name}
              sx={{ overflowX: "auto" }}
              key={index}
            >
              <Accordion.Control>{category.name}</Accordion.Control>
              <Accordion.Panel
                style={{ minWidth: "100%", width: "max-content" }}
              >
                <Table verticalSpacing="md" horizontalSpacing="md">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: 0 }}>Name</th>
                      <th style={{ paddingLeft: 0 }}>Price</th>
                      <th style={{ paddingLeft: 0 }}>Id</th>
                      <th style={{ paddingLeft: 0 }}>Last Updated</th>
                      <th style={{ paddingLeft: 0 }}>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.products?.map((product) => (
                      <tr key={product.name}>
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.name}
                          </div>
                        </td>
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.price}
                          </div>
                        </td>
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.id}
                          </div>
                        </td>
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.last_update.toString()}
                          </div>
                        </td>
                        <td>
                          <div style={{ paddingRight: "1rem" }}>
                            {product.stock ?? 0}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Group>
                  <Button mt="1.5rem" color="blue">
                    Change Details
                  </Button>
                  <Button mt="1.5rem" color="red">
                    Delete
                  </Button>
                </Group>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Skeleton>

      <Box>
        <Button
          color="blue"
          variant="outline"
          onClick={() => setCreateCategory(true)}
        >
          Create Category
        </Button>
      </Box>

      <Modal
        centered
        opened={createCategory}
        onClose={() => setCreateCategory(false)}
        title="Create Category"
      >
        <form
          onSubmit={createCategoryForm.onSubmit((values, e) => {
            postCategory(values, {
              onSuccess: () => {
                queryClient.refetchQueries(["categories"]);
                setCreateCategory(false)
              },
            });
          })}
        >
          <LoadingOverlay
            transitionDuration={500}
            visible={postCategoryLoading ?? false}
          />
          <TextInput
            placeholder="Category name"
            label="Category name"
            withAsterisk
            mb="1rem"
            {...createCategoryForm.getInputProps("name")}
          />
          <Group noWrap={false}>
            <Button type="submit">Submit</Button>
            <Button
              type="reset"
              color="red"
              onClick={() => setCreateCategory(false)}
            >
              Exit
            </Button>
          </Group>
        </form>
      </Modal>
    </main>
  );
};
export default Categories;
export const getServerSideProps = withPageAuth({ redirectTo: "/auth/signin" });
